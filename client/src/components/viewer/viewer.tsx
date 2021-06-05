import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  AnswerRequest,
  CloseResponse,
  HostRequest,
  IceCandidateRequest,
  IceCandidateResponse,
  JoinRequest,
  OfferResponse,
  StartStreamResponse,
  StopStreamResponse,
  UpdateViewersListResponse,
} from '../../../../common/contracts';
import { SocketEvents } from '../../../../common/events';
import { createSocket } from '../../lib/socket';
import { createPeer } from '../../lib/webrtc';

export interface ViewerProps {
  streamerId: string;
  viewerId: string;
}

enum Status {
  Unknown,
  Joined,
  Hosted,
  Started,
  Stopped,
  Disconnected,
}

const statusMessages: Record<Status, string> = {
  [Status.Unknown]: 'Unknown',
  [Status.Joined]: 'Joined',
  [Status.Hosted]: 'Hosted',
  [Status.Started]: 'Stream started',
  [Status.Stopped]: 'Stream stopped',
  [Status.Disconnected]: 'Host left',
};

export const Viewer = (props: ViewerProps) => {
  const [status, setStatus] = useState<Status>(Status.Unknown);
  const [viewers, setViewers] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();
  const socketRef = useRef<Socket>(createSocket());

  useEffect(() => {
    const initPeer = () => {
      peerRef.current = createPeer();
      peerRef.current.onicecandidate = (e) => {
        if (!e.candidate) {
          return;
        }
        const req: IceCandidateRequest = {
          senderId: props.viewerId,
          targetId: props.streamerId,
          candidate: e.candidate,
        };
        socketRef.current.emit(SocketEvents.ICE_CANDIDATE, req);
      };
      peerRef.current.ontrack = (e) => {
        videoRef.current!.srcObject = e.streams[0];
      };
    };
    const sendAnswer = async () => {
      const answer = await peerRef.current!.createAnswer();
      const req: AnswerRequest = {
        streamerId: props.streamerId,
        viewerId: props.viewerId,
        answer: answer,
      };
      socketRef.current.emit(SocketEvents.ANSWER, req);
    };
    socketRef.current.on(SocketEvents.HOST, (res: HostRequest) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      setStatus(Status.Hosted);
    });
    socketRef.current.on(SocketEvents.JOIN, (res: JoinRequest) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      if (res.viewerId !== props.viewerId) {
        return;
      }
      setStatus(Status.Joined);
    });
    socketRef.current.on(
      SocketEvents.START_STREAM,
      (res: StartStreamResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        if (res.viewerId !== props.viewerId) {
          throw new Error('Got response for wrong viewer');
        }
        peerRef.current!.setRemoteDescription(res.offer);
        sendAnswer();
      }
    );
    socketRef.current.on(
      SocketEvents.STOP_STREAM,
      (res: StopStreamResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        setStatus(Status.Stopped);
        videoRef.current!.srcObject = null;
      }
    );
    socketRef.current.on(SocketEvents.OFFER, (res: OfferResponse) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      if (res.viewerId !== props.viewerId) {
        throw new Error('Got response for wrong viewer');
      }
      peerRef.current!.setRemoteDescription(res.offer);
      sendAnswer();
    });
    socketRef.current.on(
      SocketEvents.ICE_CANDIDATE,
      (res: IceCandidateResponse) => {
        if (res.targetId !== props.viewerId) {
          throw new Error('Got random response');
        }
        peerRef.current!.addIceCandidate(res.candidate);
      }
    );
    socketRef.current.on(
      SocketEvents.UPDATE_VIEWERS_LIST,
      (res: UpdateViewersListResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        setViewers(res.viewerIds);
      }
    );
    socketRef.current.on(SocketEvents.CLOSE, (res: CloseResponse) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      setStatus(Status.Disconnected);
      videoRef.current!.srcObject = null;
      setViewers([]);
      initPeer();
    });
    initPeer();
    const req: JoinRequest = {
      streamerId: props.streamerId,
      viewerId: props.viewerId,
    };
    socketRef.current.emit('join', req);
  }, []);

  return (
    <div>
      <video autoPlay={true} ref={videoRef} />
      <p>Status: {statusMessages[status]}</p>
      <p>Viewers: {viewers.join(', ')}</p>
    </div>
  );
};
