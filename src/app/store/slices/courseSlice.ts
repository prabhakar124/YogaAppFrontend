import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Course {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface CourseState {
  courses: Course[];
  enrolledCourses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk('course/fetchCourses', async () => {
  const response = await fetch('http://localhost:4000/api/courses');
  return response.json();
});

export const enrollCourse = createAsyncThunk('course/enroll', async (courseId: string) => {
  const response = await fetch(`http://localhost:4000/api/courses/${courseId}/enroll`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.loading = true; })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed';
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload.course);
      });
  },
});

export default courseSlice.reducer;
    