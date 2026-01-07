import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { AlunoEdit, AlunoList } from "./AlunoList.js"
import { Dashboard } from "./dashboard.js";
import { ProfessorEdit, ProfessorList } from "./ProfessorList.js";
import PersonIcon from '@mui/icons-material/Person';
import BackpackIcon from '@mui/icons-material/Backpack';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import Looks4Icon from '@mui/icons-material/Looks4';
import { DisciplinaList, DisciplinaEdit } from "./DisciplinaList.js";
import { InscricaoEdit, InscricaoList } from "./InscricaoList.js";
import { TesteEdit, TesteList } from "./TesteList.js";
import { ResultadoEdit, ResultadoList } from "./ResultadoList.js";

const dataProvider = lb4Provider("http://localhost:3000");

function App() {
  return (
    <Admin dashboard={Dashboard} dataProvider={dataProvider}>
      <Resource name="alunos" icon={BackpackIcon} list={AlunoList} edit={AlunoEdit} />
      <Resource name="professors" icon={PersonIcon} list={ProfessorList} edit={ProfessorEdit} />
      <Resource name="disciplinas" icon={CollectionsBookmarkIcon} list={DisciplinaList} edit={DisciplinaEdit} />
      <Resource name="inscricaos" icon={ArticleIcon} list={InscricaoList} edit={InscricaoEdit} />
      <Resource name="testes" icon={FolderIcon} list={TesteList} edit={TesteEdit} />
      <Resource name="resultados" icon={Looks4Icon} list={ResultadoList} edit={ResultadoEdit} />
    </Admin>
  );
}

export default App;
