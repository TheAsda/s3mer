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
import { ViewersList } from '../viewers-list/viewers-list';
import { Text } from '../text/text';

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
    const join = () => {
      const req: JoinRequest = {
        streamerId: props.streamerId,
        viewerId: props.viewerId,
      };
      socketRef.current.emit('join', req);
    };
    const sendAnswer = async () => {
      const answer = await peerRef.current!.createAnswer();
      peerRef.current?.setLocalDescription(answer);
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
      join();
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
        setStatus(Status.Started);
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
        initPeer();
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
    join();
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-5">
      <div className="col-span-3 row-span-4 p-2">
        <div className="aspect-w-16 aspect-h-9">
          <video
            autoPlay
            muted
            playsInline
            ref={videoRef}
            poster="https://i.imgur.com/RwdPVxo.png"
          />
        </div>
      </div>
      <ViewersList
        streamerId={props.streamerId}
        viewerId={props.viewerId}
        viewers={viewers}
        className="col-start-4 col-span-1 row-start-1 row-span-4"
      />
      <div className="flex justify-center col-span-3">
        <Text size="lg">
          <strong>Status:</strong> {statusMessages[status]}
        </Text>
      </div>
    </div>
  );
};
