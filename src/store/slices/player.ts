import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { api } from '../../lib/axios';
import { VideoPlayPayload } from '../types';

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
}

const INITIAL_STATE: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
};

export const loadCourses = createAsyncThunk('player/load', async () => {
  const { data } = await api.get('/courses/1');

  return data;
});

const playerSlice = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    load: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
    play: (state, action: PayloadAction<VideoPlayPayload>) => {
      state.currentLessonIndex = action.payload.lessonIndex;
      state.currentModuleIndex = action.payload.moduleIndex;
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;
      const nextModule = state.course?.modules[nextModuleIndex];

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex;
        state.currentLessonIndex = 0;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourses.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourses.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;
export const playerActions = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentModule = state.player?.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
