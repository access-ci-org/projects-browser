import React from "react";
import Accordion  from "react-bootstrap/Accordion";

const Project = ({ project }) => {
  const resources = project.resources;

  const formatNumber = (resource) => {
    if(resource.units == "[Yes = 1, No = 0]"){
      return resource.allocation == "1.0" ? "Yes" : "No"
    } else {
      let allocation = "0";
      if(parseInt(resource.allocation)){
        allocation = parseInt(resource.allocation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      let units = resource.units;
      if(units == "ACCESS Credits"){
        units = (<span className="tooltip-underline" title="universal currency that can be exchanged for resource units">ACCESS Credits</span>)
      }
      return (
        <>
          {allocation}&nbsp;{units}
        </>
      )
    }
  }

  return (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
            <span className="fw-bold">{project.title}</span> <br />
            <span className="fst-italic">{project.pi} <small> ({project.pi_institution}) </small></span>
        </div>
        <div className="card-body">
          <div className="row fw-bold border-bottom">
            <div className="col">
              <span className="mb-1 pb-0">Field of Science</span>
            </div>
            <div className="col">
              <span className="mb-1 pb-0 tooltip-underline" title='A specific level of allocation; also referred to as "Opportunity"'>Project Type</span>
            </div>
            <div className="col">
              <span className="mb-1 pb-0">Dates</span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              {project.primary_fos}
            </div>
            <div className="col">
              {project.allocation_type}
            </div>
            <div className="col">
              {project.start_date} to {project.end_date}
            </div>
          </div>

          <Accordion flush className="mt-3 mb-1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                  Resources
              </Accordion.Header>
              <Accordion.Body>
                <table className="table table-striped table-bordered mt-2 mb-0">
                  <thead>
                    <tr>
                      <td><span className="m-0 p-0">Resource</span></td>
                      <td><span className="m-0 p-0 d-inline">Allocation</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((r,i) =>
                      <tr key={`resource_${project.project_id}_${i}`}>
                        <td>{r.resource_name}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{formatNumber(r)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Abstract
              </Accordion.Header>
              <Accordion.Body>
                <div className="abstract">{ project.abstract }</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </div>
      </div>
  )
}

export default Project;