import React from "react";
import { useSelector } from "react-redux";
import Project from "./Project";
import { selectProjects } from "../state/browserSlice";

const ProjectList = () => {
  const projects = useSelector( selectProjects );
  return (
      <div>
        {projects.map((p, i) =>
            <Project key={`project_${i}`} project={p} />
        )}
      </div>
  )
}

export default ProjectList;