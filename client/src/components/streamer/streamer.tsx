import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { createPeer } from '../../lib/webrtc';
import { Socket } from 'socket.io-client';
import { createSocket } from '../../lib/socket';
import { SocketEvents } from '../../../../common/events';
import {
  AnswerResponse,
  HostRequest,
  HostResponse,
  IceCandidateRequest,
  IceCandidateResponse,
  JoinResponse,
  OfferRequest,
  StartStreamRequest,
  StartStreamResponse,
  StopStreamRequest,
  StopStreamResponse,
  UpdateViewersListResponse,
} from '../../../../common/contracts';

export interface StreamerProps {
  streamerId: string;
}

enum Status {
  Unknown,
  Hosted,
  Started,
  Stopped,
}

const statusMessages: Record<Status, string> = {
  [Status.Unknown]: 'Unknown',
  [Status.Hosted]: 'Room hosted',
  [Status.Started]: 'Stream started',
  [Status.Stopped]: 'Stream stopped',
};

export const Streamer = (props: StreamerProps) => {
  const [status, setStatus] = useState<Status>(Status.Unknown);
  const [viewers, setViewers] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Record<string, RTCPeerConnection>>({});
  const socketRef = useRef<Socket>(createSocket());
  const streamRef = useRef<MediaStream>();

  const host = () => {
    const req: HostRequest = {
      streamerId: props.streamerId,
    };
    socketRef.current.emit(SocketEvents.HOST, req);
  };

  const startStream = async () => {
    // @ts-ignore
    if (!navigator.mediaDevices.getDisplayMedia) {
      alert(
        'navigator.mediaDevices.getDisplayMedia not supported on your browser, use the latest version of Chrome'
      );
      return;
    }
    // @ts-ignore
    streamRef.current = navigator.mediaDevices.getDisplayMedia({
      video: true,
    }) as MediaStream;
    videoRef.current!.srcObject = streamRef.current;
    const tracks = streamRef.current.getTracks();

    const offers: Record<string, RTCSessionDescriptionInit> = {};
    for (const viewerId of viewers) {
      const peer = createPeer();
      peer.onicecandidate = (e) => {
        if (!e.candidate) {
          return;
        }
        const req: IceCandidateRequest = {
          senderId: props.streamerId,
          targetId: viewerId,
          candidate: e.candidate,
        };
        socketRef.current.emit(SocketEvents.ICE_CANDIDATE, req);
      };
      tracks.forEach((track) => peer.addTrack(track, streamRef.current!));
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      peerRef.current[viewerId] = peer;
      offers[viewerId] = offer;
    }
    const req: StartStreamRequest = {
      streamerId: props.streamerId,
      offers: offers,
    };
    socketRef.current.emit(SocketEvents.START_STREAM, req);
  };

  const stopStream = () => {
    const tracks = (videoRef.current!.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current!.srcObject = null;
    const req: StopStreamRequest = {
      streamerId: props.streamerId,
    };
    socketRef.current.emit(SocketEvents.STOP_STREAM, req);
  };

  useEffect(() => {
    socketRef.current.on(SocketEvents.HOST, (res: HostResponse) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      setStatus(Status.Hosted);
    });
    socketRef.current.on(
      SocketEvents.START_STREAM,
      (res: StartStreamResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        setStatus(Status.Started);
      }
    );
    socketRef.current.on(
      SocketEvents.STOP_STREAM,
      (res: StopStreamResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        setStatus(Status.Stopped);
      }
    );
    socketRef.current.on(SocketEvents.ANSWER, (res: AnswerResponse) => {
      if (res.streamerId !== props.streamerId) {
        throw new Error('Got random response');
      }
      peerRef.current[res.viewerId].setRemoteDescription(res.answer);
    });
    socketRef.current.on(
      SocketEvents.ICE_CANDIDATE,
      (res: IceCandidateResponse) => {
        if (res.targetId !== props.streamerId) {
          throw new Error('Got random response');
        }
        peerRef.current[res.senderId].addIceCandidate(res.candidate);
      }
    );
    socketRef.current.on(
      SocketEvents.UPDATE_VIEWERS_LIST,
      async (res: UpdateViewersListResponse) => {
        if (res.streamerId !== props.streamerId) {
          throw new Error('Got random response');
        }
        const newViewers = res.viewerIds.filter(
          (viewerId) => !viewers.includes(viewerId)
        );
        const removedViewers = viewers.filter(
          (viewerId) => !res.viewerIds.includes(viewerId)
        );
        for (const viewerId of removedViewers) {
          delete peerRef.current[viewerId];
        }
        for (const viewerId of newViewers) {
          const peer = createPeer();
          peer.onicecandidate = (e) => {
            if (!e.candidate) {
              return;
            }
            const req: IceCandidateRequest = {
              senderId: props.streamerId,
              targetId: viewerId,
              candidate: e.candidate,
            };
            socketRef.current.emit(SocketEvents.ICE_CANDIDATE, req);
          };
          streamRef
            .current!.getTracks()
            .forEach((track) => peer.addTrack(track, streamRef.current!));
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          peerRef.current[viewerId] = peer;
          const req: OfferRequest = {
            streamerId: props.streamerId,
            viewerId: viewerId,
            offer: offer,
          };
          socketRef.current.emit(SocketEvents.OFFER, req);
        }
        setViewers(
          viewers
            .filter((viewerId) => !removedViewers.includes(viewerId))
            .concat(newViewers)
        );
      }
    );

    const req: HostRequest = {
      streamerId: props.streamerId,
    };
    socketRef.current.emit(SocketEvents.HOST, req);
  }, []);

  return (
    <div>
      <video autoPlay={true} ref={videoRef} />
      <span>Viewers: {viewers.join(', ')}</span>
      <span>Status: {statusMessages[status]}</span>
      <button onClick={startStream}>Start streaming</button>
      <button onClick={stopStream}>Stop streaming</button>
    </div>
  );
};
