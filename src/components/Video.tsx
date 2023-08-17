import { Loader } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../store';
import { playerActions, useCurrentLesson } from '../store/slices/player';

export function Video() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  function handlePlayNext() {
    dispatch(playerActions.next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="h-full grid place-items-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          url={`http://youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
