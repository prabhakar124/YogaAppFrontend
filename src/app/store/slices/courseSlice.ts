import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseAPI } from '@/app/services/api';

interface Course {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrolledCourses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await courseAPI.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'course/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await courseAPI.getById(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const enrollCourse = createAsyncThunk(
  'course/enroll',
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await courseAPI.enroll(courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single course
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Enroll course
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses.push(action.payload.course);
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;