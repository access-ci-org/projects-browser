import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Accordion  from "react-bootstrap/Accordion";
import { selectIsSingleEntry } from "../state/browserSlice";

const Project = ({ project }) => {
  const resources = project.resources;
  const [showAlert, setShowAlert] = useState(false);
  const singleEntry = useSelector( selectIsSingleEntry );
  const buttonRef = useRef(null);

  let accordionProps = {
    flush: true,
    className: "mt-3 mb-1",
  }

  if(singleEntry){
    accordionProps.defaultActiveKey = ['0','1'];
    accordionProps.activeKey = ['0', '1'];
  }

  const formatNumber = (resource) => {
    let units = resource.units ? resource.units : resource.resourceUnits;
    const amount = resource.allocation ? resource.allocation : resource.amount;

    if(units == "[Yes = 1, No = 0]"){
      return resource.allocation == "1.0" ? "Yes" : "No"
    } else {
      let allocation = "0";
      if(parseInt(amount)){
        allocation = parseInt(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

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

  const requestNumber = () => {
    if(project.requestNumber && project.requestNumber != "") return `(${project.requestNumber})`

    return '';
  }

  const copyRequestNumber = () => {
    const { origin, pathname } = window.location;
    const link = `${origin}${pathname}?_requestNumber=${project.requestNumber}`;
    navigator.clipboard.writeText(link);
    setShowAlert(true);
    buttonRef.current.className = '';
    buttonRef.current.innerText = "Copied!"

    setTimeout(() => {
      buttonRef.current.className = 'material-icons';
      buttonRef.current.innerText = "link";

      setShowAlert(false);
    }, 2000);
  }

  const requestNumberLink = () => {
    if(requestNumber()){
      const btnStyle = {
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: showAlert ? "14px" : "24px",
      };

      return (
          <button
            onClick={copyRequestNumber}
            style={btnStyle}
          >
              <span ref={buttonRef} className="material-icons">link</span>
          </button>
      )
    }

    return <></>
  }

  return (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between">
            <div>
              <span className="fw-bold">{requestNumber()} {project.requestTitle}</span> <br />
              <span className="fst-italic">{project.pi} <small> ({project.piInstitution}) </small></span>
            </div>
            <div>
              { requestNumberLink() }
            </div>
          </div>
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
              {project.fos}
            </div>
            <div className="col">
              {project.allocationType}
            </div>
            <div className="col">
              {project.beginDate} to {project.endDate}
            </div>
          </div>

          <Accordion {...accordionProps} >
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
                      <tr key={`resource_${project.requestId}_${i}`}>
                        <td>{r.resourceName}</td>
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