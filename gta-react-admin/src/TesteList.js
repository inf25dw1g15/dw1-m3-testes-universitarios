import { DataTable, DateField, DateInput, Edit, EditButton, Filter, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Teste {`"${record.tema}"`}</span>) : null;
}

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="tema" alwaysOn />
  </Filter>
)

export const TesteList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="tema" />
      <DataTable.Col source="data">
        <DateField source="data" />
      </DataTable.Col>
      <DataTable.Col source="criado_em">
        <DateField source="criado_em" />
      </DataTable.Col>
      <DataTable.Col source="disciplina_id">
        <ReferenceField source="disciplina_id" reference="disciplinas" />
      </DataTable.Col>
      <EditButton />
    </DataTable>
  </List>
);

export const TesteEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="tema" />
      <DateInput
        source="data"
        parse={value => value && new Date(value).toISOString()}
        format={value => value && value.substring(0, 10)}
      />
      <DateInput
        source="criado_em"
        parse={value => value && new Date(value).toISOString()}
        format={value => value && value.substring(0, 10)}
      />
      <ReferenceInput source="disciplina_id" reference="disciplinas">
        <SelectInput optionText="nome" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);