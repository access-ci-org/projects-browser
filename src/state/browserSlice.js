import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const data = document.getElementById("projects_browser_app").dataset;

const initialState = {
  apiUrl: null,
  pages: 1,
  projects: [],
  projectsLoaded: false,
  filtersLoaded: false,
  showPagination: false,
  filters: {
    org: '',
    allocationType: '',
    allFosToggled: true
  },
  pageData: {
    current_page: 1,
    last_page: 1
  },
  typeLists: {
    orgs: [],
    fosTypes: [],
    allocationTypes: [],
  }
}

export const initApp = createAsyncThunk(
  'projectsBrowser/initApp',
  async(args, { getState, dispatch }) => {
    dispatch( setApiUrl(args.projects) );
    dispatch( getFilters(args.filters) );
    dispatch( getProjects() );
  }
)

export const getFilters = createAsyncThunk(
  'projectsBrowser/getFilters',
  async (args, { getState, dispatch }) => {

    const response = await fetch(args);
    const data = await response.json();

    dispatch( setTypeLists(data) );

  }
);

export const getProjects = createAsyncThunk(
  'projectsBrowser/getProjects',
  async (args, { getState }) => {
    const state = getState().projectsBrowser;

    const filters = state.filters;
    const typeLists = state.typeLists;
    const fosList = typeLists.fosTypes.filter((fos) => fos.checked)
    let url = `${state.apiUrl}?page=${state.pageData.current_page}`;

    if(fosList.length != typeLists.fosTypes.length){
      url += `&fos=${fosList.map((fos) => fos.fos_type_id)}`;
    }

    if(filters.org != ''){
      url += `&org=${filters.org}`;
    }

    if(filters.allocationType != ''){
      url += `&allocation_type=${filters.allocationType}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;

  }
);

export const browserSlice = createSlice({
  name: 'projectsBrowser',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filters = {
        org: '',
        allocationType: '',
        allFosToggled: false
      }

      browserSlice.caseReducers.toggleAllFos(state);

    },
    setApiUrl: (state, { payload }) => {
      state.apiUrl = payload;
    },
    setShowPagination: (state, { payload }) => {
      state.showPagination = payload;
    },
    setTypeLists: (state, { payload }) => {
      state.typeLists = payload;
    },
    toggleAllFos: (state) => {
      state.typeLists.fosTypes.forEach((fos) => fos.checked = !state.filters.allFosToggled );
      state.filters.allFosToggled = !state.filters.allFosToggled;
    },
    toggleFos: (state, { payload }) => {

      state.typeLists.fosTypes.forEach((fos) => {
        if(fos.fos_type_id == payload.fos_type_id){
          fos.checked = !fos.checked
        }
      })

      if(state.typeLists.fosTypes.filter((f) => f.checked).length != state.typeLists.fosTypes.length){
        state.filters.allFosToggled = false;
      } else {
        state.filters.allFosToggled = true;
      }
    },
    updateFilter: (state, { payload }) => {
      state.filters[payload.name] = payload.value;
    },
    updatePageData: (state, { payload }) => {
      if(payload.current_page){
        state.pageData.current_page = payload.current_page;
      }

      if(payload.last_page){
        state.pageData.last_page = payload.last_page
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.projectsLoaded = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        const data = action.payload;
        state.projectsLoaded = true;
        state.projects = data.projects;
        if(data.pages != state.pageData.last_page){
          state.pageData.current_page = 1;
        }
        state.showPagination = true;
        state.pageData.last_page = data.pages;
      })
      .addCase(getProjects.rejected, (state, data) => {
        console.log(data.error)
      })
      .addCase(getFilters.pending, (state) => {
        state.filtersLoaded = false;
      })
      .addCase(getFilters.fulfilled, (state) => {
        state.filtersLoaded = true;
      })
  }
})

export const {
  resetFilters,
  setApiUrl,
  setShowPagination,
  setTypeLists,
  toggleAllFos,
  toggleFos,
  updateFilter,
  updatePageData,
} = browserSlice.actions;

export const selectFilters = (state) => state.projectsBrowser.filters;
export const selectFiltersLoaded = (state) => state.projectsBrowser.filtersLoaded;
export const selectFosTypes = (state) => state.projectsBrowser.fosTypes;
export const selectProjectsLoaded = (state) => state.projectsBrowser.projectsLoaded;
export const selectPageData = (state) => state.projectsBrowser.pageData;
export const selectPages = (state) => state.projectsBrowser.selectPages;
export const selectProjects = (state) => state.projectsBrowser.projects;
export const selectShowPagination = (state) => state.projectsBrowser.filtersLoaded && state.projectsBrowser.projectsLoaded;
export const selectTypeLists = (state) => state.projectsBrowser.typeLists;
export default browserSlice.reducer;