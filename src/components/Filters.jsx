import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import { selectFilters, selectTypeLists } from "../state/browserSlice";
import {
  getProjects,
  resetFilters,
  selectFiltersLoaded,
  setShowPagination,
  toggleAllFos,
  toggleFos,
  updateFilter,
  updatePageData
} from "../state/browserSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector( selectFilters )
  const typeLists = useSelector( selectTypeLists )
  const orgList = typeLists.orgs.map((org) => {
    return {
      label: org,
      value: org
    }
  })
  const filtersLoaded = useSelector( selectFiltersLoaded );
  const selectRef = useRef();
  const [orgValue, setOrgValue] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const handleFilterChange = (e) => {
    dispatch( updateFilter({ name: e.target.name, value: e.target.value }) )
  }

  const handleSubmit = () => {
    window.scrollTo(0,0)
    setFiltered(true);
    dispatch( setShowPagination(false) );
    dispatch( updatePageData( {current_page: 1} ) );
    dispatch( getProjects() );
  }

  const handleReset = () => {
    setOrgValue([]);
    dispatch( setShowPagination(false) );
    dispatch( updatePageData( {current_page: 1} ) );
    dispatch( resetFilters() );
    if(filtered){
      window.scrollTo(0,0)
      dispatch( getProjects() );
      setFiltered(false);
    }

  }

  const updateOrgs = (opt) => {
    setOrgValue(opt)
    if(opt.length > 0){
      dispatch( updateFilter({ name: "org", value: opt[0].value }));
    }
  }

  const buttonDisabled = () => {
    return (
      filters.org == ''
      && filters.allocationType == ''
      && filters.allFosToggled
    )
  }

  if(!filtersLoaded) {
    return (<></>)
  }

  return (
    <div className="row sticky-top mb-2">
      <div className="col">
        <h3 className="mb-2">Filters</h3>
        <h5 className="mb-1">Field of Science</h5>
        <div className="fos-select-list border mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="toggle_all"
              checked={filters.allFosToggled}
              onChange={() => { dispatch( toggleAllFos() ) } }
            />
            <label className="form-check-label" htmlFor={`toggle_all`}>
              (Toggle All)
            </label>
          </div>
          {typeLists.fosTypes.map((fos) =>
            <div className="form-check" key={`fos_${fos.fos_type_id}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value={fos.fos_type_id}
                id={`fos_${fos.fos_type_id}`}
                checked={fos.checked}
                onChange={() => dispatch( toggleFos(fos) )}
              />
              <label className="form-check-label" htmlFor={`fos_${fos.fos_type_id}`}>
                {fos.fos_name}
              </label>
            </div>
          )}

        </div>

        <h5 id="org_select_label" className="mb-1">Organization</h5>
        <div className="mb-3">
          <Typeahead
            onChange={(selected) => updateOrgs(selected)}
            options={orgList}
            selected={orgValue}
            id="OrgSelect"
            aria-labelledby="org_select_label"
          />
        </div>

        <h5 id="project_type_label" className="mb-1 tooltip-underline" title='A specific level of allocation; also referred to as "Opportunity"'>Project Type</h5>
        <div className="mb-3">
            <select
              name="allocationType"
              id="project_type_select"
              value={filters.allocationType}
              className="form-control"
              aria-labelledby="project_type_label"
              onChange={(e) => handleFilterChange(e)}
            >
              <option value="">-- All --</option>
              {typeLists.allocationTypes.map((a, i) =>
                <option value={a} key={`allocation_type_${i}`}>{a}</option>
              )}
            </select>
        </div>

        <div className="mt-2">
          <button
            className="btn btn-primary me-2"
            onClick={handleSubmit}>Submit</button>
          <button
            className="btn btn-secondary"
            disabled={buttonDisabled()}
            onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Filters;