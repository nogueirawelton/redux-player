import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { playerActions } from '../store/slices/player';
import { Lesson } from './Lesson';

interface ModuleProps {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
}
export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  const { currentModuleIndex, currentLessonIndex } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;
    return { currentModuleIndex, currentLessonIndex };
  });

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  const dispatch = useAppDispatch();

  return (
    <Collapsible.Root
      className="group"
      defaultOpen={moduleIndex == 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <span className="h-10 w-10 rounded-full font-bold grid place-items-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </span>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">
            {amountOfLessons} Aula{amountOfLessons > 1 ? 's' : ''}
          </span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={
                  currentLessonIndex == lessonIndex &&
                  currentModuleIndex == moduleIndex
                }
                onPlay={() =>
                  dispatch(playerActions.play({ moduleIndex, lessonIndex }))
                }
              />
            ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
