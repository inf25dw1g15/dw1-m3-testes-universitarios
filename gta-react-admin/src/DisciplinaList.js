import { DataTable, DateField, List, ReferenceField, useRecordContext, Filter, TextInput, Edit, SimpleForm, NumberInput, DateInput, EditButton, ReferenceInput, SelectInput } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Disciplina {`"${record.nome}"`}</span>) : null;
}

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="nome" alwaysOn />
  </Filter>
)

export const DisciplinaList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="nome" />
      <DataTable.NumberCol source="numero_horas" />
      <DataTable.Col source="criado_em">
        <DateField source="criado_em" />
      </DataTable.Col>
      <DataTable.Col source="professor_id">
        <ReferenceField source="professor_id" reference="professors" />
      </DataTable.Col>
      <EditButton />
    </DataTable>
  </List>
);

export const DisciplinaEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="nome" />
      <NumberInput source="numero_horas" />
      <DateInput 
        source="criado_em" 
        parse={value => value && new Date(value).toISOString()}
        format={value => value && value.substring(0, 10)}
      />
      <ReferenceInput source="professor_id" reference="professors">
        <SelectInput optionText="nome" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);