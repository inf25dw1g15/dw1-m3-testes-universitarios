import { useEffect, useState } from "react";
import { CardHeader, Card, CardContent, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BackpackIcon from '@mui/icons-material/Backpack';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import FolderIcon from '@mui/icons-material/Folder';
import { CardWithIcon } from "./components/CardWithIcon";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from "@mui/x-charts";

const styles = {
  w35: { width: '35%', },
  w65: { width: '65%', },
  flex: { display: 'flex', gap: '12px' },
  flexColumn: { display: 'flex', flexDirection: 'column', gap: '12px' },

}

export const Dashboard = () => {
  const [counts, setCounts] = useState({
    alunos: null,
    disciplinas: null,
    testes: null,
    professores: null,
  });

  const [graficoNotas, setGraficoNotas] = useState({
    aprovados: 0,
    reprovados: 0,
  });

  const [inscricoesChart, setInscricoesChart] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/alunos/count").then(r => r.json()),
      fetch("http://localhost:3000/disciplinas/count").then(r => r.json()),
      fetch("http://localhost:3000/testes/count").then(r => r.json()),
      fetch("http://localhost:3000/professors/count").then(r => r.json()),
      fetch("http://localhost:3000/resultados").then(r => r.json()),
      fetch("http://localhost:3000/inscricaos").then(r => r.json()),
    ])
      .then(([alunos, disciplinas, testes, professores, resultados, inscricaos]) => {
        setCounts({
          alunos: alunos.count,
          disciplinas: disciplinas.count,
          testes: testes.count,
          professores: professores.count,
        });

        const aprovados = resultados.filter(r => r.nota >= 10).length;
        const reprovados = resultados.filter(r => r.nota < 10).length;

        setGraficoNotas({
          aprovados,
          reprovados,
        });

        const meses = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const contagemPorMes = Array(12).fill(0);

        inscricaos.forEach(inscricao => {
          const data = new Date(inscricao.data_inscricao);
          const mes = data.getMonth(); // 0–11
          contagemPorMes[mes]++;
        });

        setInscricoesChart({
          labels: meses,
          data: contagemPorMes,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div style={styles.flexColumn}>
      <Card>
        <CardHeader title="Bem-vindo ao centro de Administração da API de Gestão de Testes Universitários" />
      </Card>
      <div style={styles.flex}>
        <CardWithIcon
          to="/alunos"
          icon={BackpackIcon}
          title={"Alunos"}
          subtitle={counts.alunos ?? "…"}
        />
        <CardWithIcon
          to="/professors"
          icon={PersonIcon}
          title="Professores"
          subtitle={counts.professores ?? "…"}
        />
        <CardWithIcon
          to="/disciplinas"
          icon={CollectionsBookmarkIcon}
          title="Disciplinas"
          subtitle={counts.disciplinas ?? "…"}
        />
        <CardWithIcon
          to="/testes"
          icon={FolderIcon}
          title="Testes Realizados"
          subtitle={counts.testes ?? "…"}
        />
      </div>
      <div style={styles.flex}>
        <Card style={styles.w35}>
          <CardHeader title="Taxa de Aprovação/Reprovação de Alunos" subheader="Aqui vês um grafico Circular que representa o numero total de Aprovações e Reprovações de todos os testes com resultados já disponiveis." />
          <CardContent>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: graficoNotas.aprovados, label: 'Alunos Aprovados' },
                    { id: 1, value: graficoNotas.reprovados, label: 'Alunos Reprovados' }
                  ]
                }
              ]}
              width={200}
              height={200}
            />
          </CardContent>
        </Card>
        <Card style={styles.w65}>
          <CardHeader title="Inscrições ao longo do Ano" />
          <CardContent>
            <Box sx={{ width: '100%', height: 300 }}>
              <LineChart
                series={[
                  { data: inscricoesChart.data, label: 'Inscrições' },
                ]}
                xAxis={[{ scaleType: 'point', data: inscricoesChart.labels }]}
                yAxis={[{ width: 50 }]}
                margin={{ right: 24 }}

              />
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}