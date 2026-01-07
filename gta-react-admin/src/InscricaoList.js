import { DataTable, DateField, DateInput, Edit, EditButton, Filter, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Inscrição {`"${record.id}"`}</span>) : null;
}

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="id" alwaysOn />
  </Filter>
)

export const InscricaoList = ( props ) => (
  <List filters={<PostFilter />} {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="aluno_id">
        <ReferenceField source="aluno_id" reference="alunos" />
      </DataTable.Col>
      <DataTable.Col source="disciplina_id">
        <ReferenceField source="disciplina_id" reference="disciplinas" />
      </DataTable.Col>
      <DataTable.Col source="data_inscricao">
        <DateField source="data_inscricao" />
      </DataTable.Col>
      <EditButton />
    </DataTable>
  </List>
);

export const InscricaoEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <ReferenceInput source="aluno_id" reference="alunos">
        <SelectInput optionText="nome" />
      </ReferenceInput>
      <ReferenceInput source="disciplina_id" reference="disciplinas">
        <SelectInput optionText="nome" />
      </ReferenceInput>
      <DateInput 
        source="data_inscricao" 
        parse={value => value && new Date(value).toISOString()}
        format={value => value && value.substring(0, 10)}   
      />
    </SimpleForm>
  </Edit>
);