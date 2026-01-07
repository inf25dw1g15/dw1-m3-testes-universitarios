import { DataTable, Edit, Filter, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Resultado {`"${record.nota}"`}</span>) : null;
}

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
)

export const ResultadoList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.NumberCol source="nota" />
      <DataTable.Col source="teste_id">
        <ReferenceField source="teste_id" reference="testes" />
      </DataTable.Col>
      <DataTable.Col source="aluno_id">
        <ReferenceField source="aluno_id" reference="alunos" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const ResultadoEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <NumberInput source="nota" />
      <ReferenceInput source="teste_id" reference="testes">
        <SelectInput optionText="tema" />
      </ReferenceInput>
      <ReferenceInput source="aluno_id" reference="alunos">
        <SelectInput optionText="nome" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);