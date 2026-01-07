import { DataTable, DateField, DateInput, Edit, EditButton, EmailField, Filter, List, NumberInput, SimpleForm, TextInput, useRecordContext } from "react-admin";

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Professor {`"${record.nome}"`}</span>) : null;
}

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="email" alwaysOn />
  </Filter>
)

export const ProfessorList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="nome" />
      <DataTable.Col source="email">
        <EmailField source="email" />
      </DataTable.Col>
      <DataTable.Col source="criado_em">
        <DateField source="criado_em" />
      </DataTable.Col>
      <EditButton />
    </DataTable>
  </List>
);

export const ProfessorEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="nome" />
      <TextInput source="email" type="email" />
      <DateInput 
        source="criado_em" 
        parse={value => value && new Date(value).toISOString()}
        format={value => value && value.substring(0, 10)}  
      />

    </SimpleForm>
  </Edit>
);