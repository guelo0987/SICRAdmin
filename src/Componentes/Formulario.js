import React from 'react';
import { 
  TextInput, 
  Select, 
  Button, 
  Group, 
  Stack,
  Paper,
  Title,
  Text,
  Divider
} from '@mantine/core';
import '../Estilos/Formulario.css';

const Formulario = ({ 
  title,
  description,
  fields,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  loading = false
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            description={field.description}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            required={field.required}
            error={field.error}
          />
        );
      case 'select':
        return (
          <Select
            key={field.id}
            label={field.label}
            description={field.description}
            placeholder={field.placeholder}
            data={field.options}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            error={field.error}
            searchable
            clearable
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper shadow="sm" radius="md" className="form-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <div className="form-header">
          <Title order={2}>{title}</Title>
          {description && (
            <Text color="dimmed" size="sm">
              {description}
            </Text>
          )}
        </div>

        <Divider my="lg" />

        <Stack spacing="md" className="form-fields">
          {fields.map(field => renderField(field))}
        </Stack>

        <Divider my="lg" />

        <Group position="right" spacing="md" className="form-actions">
          <Button
            variant="outline"
            color="gray"
            onClick={onCancel}
            className="cancel-button"
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            color="red"
            loading={loading}
            className="submit-button"
          >
            {submitLabel}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Formulario;
