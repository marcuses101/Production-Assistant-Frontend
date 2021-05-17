import { useLoginActions } from "./Hooks/useLoginActions";
import { Link, useHistory } from "react-router-dom";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import "./Sidenav.css";

export function Sidenav() {
  const { push } = useHistory();
  const loginActions = useLoginActions();
  const projectId = useParamsProjectId();
  function closeNav(){
    const root = document.getElementById('root');
    root.classList.replace('open','closed');
  }
  function openNav(){
    const root = document.getElementById('root');
    root.classList.replace('closed','open');
  }
  function handleClick(e){
    if (['A','BUTTON'].includes(e.target.tagName)) {
     return closeNav();
    }
  }

  return (
    <nav className="Sidenav" onClick={handleClick}>
      <ul>
        <li>
          <Link to={`/project/${projectId}`}>Overview</Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/scene/add`}>Add Scene</Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/item/add`}>Add Item</Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/item`}>Shopping List</Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/acquisition/add`}>
            Add Acquisition
          </Link>
        </li>
        <li>
          <Link to={`/project/${projectId}/edit`}>Edit Project</Link>
        </li>
        <li>
          <Link to="/project">Change Project</Link>
        </li>
        <li>
          <button
            onClick={() => {
              loginActions.logout();
              push("/");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
