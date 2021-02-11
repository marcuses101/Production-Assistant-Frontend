import { useLoginActions } from "./Hooks/useLoginActions";
import {Link} from 'react-router-dom'
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import "./Sidenav.css";

export function Sidenav() {
  const loginActions = useLoginActions();
  const projectId = useParamsProjectId();
  console.log(projectId)
  return (
    <nav className="Sidenav">
      <ul>
        <li><Link to={`/project/${projectId}`}>Overview</Link></li>
        <li><Link to={`/project/${projectId}/scene/add`}>Add Scene</Link></li>
        <li><Link to={`/project/${projectId}/edit`}>Edit Project</Link></li>
        <li><Link to={`/project/${projectId}/item/add`}>Add Item</Link></li>
        <li><Link to=''></Link></li>
        <li><Link to='/project'>Change Project</Link></li>
        <li>
          <button onClick={loginActions.logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
