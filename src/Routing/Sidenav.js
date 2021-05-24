import { Link, useHistory } from "react-router-dom";
import { useParamsProjectId } from "../Hooks/useParamsProjectId";
import { useUserServices } from "../Hooks/useUserServices";
import "./Sidenav.css";

export function Sidenav() {
  const { push } = useHistory();
  const {logout} = useUserServices();
  const projectId = useParamsProjectId();
  function closeNav(){
    const root = document.getElementById('root');
    root.classList.replace('open','closed');
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
          <Link to={`/project/${projectId}/edit`}>Edit Project</Link>
        </li>
        <li>
          <Link to="/project">Change Project</Link>
        </li>
        <li>
          <button
            onClick={() => {
              logout();
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
