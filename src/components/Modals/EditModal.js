import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
  Option,
  Textarea,
  Switch,
} from '@mui/joy';

/**
 * Reusable Edit Modal Component
 */
export default function EditModal({
  open,
  onClose,
  onSave,
  title = 'Edit Item',
  fields = [],
  data = {},
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && data) {
      const normalizedData = {
        ...data,
        category_id: data?.category_id
          ? String(data.category_id)
          : "",
      };

      setFormData(normalizedData);
      setErrors({});
    }
  }, [open, data]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const renderField = (field) => {
    const hasError = !!errors[field.name];

    switch (field.type) {
      // ================= BOOLEAN / SWITCH =================
      case 'boolean':
      case 'switch':
        return (
          <Switch
            className='mr-auto!'
            checked={Boolean(formData[field.name])}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            disabled={field.disabled}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={hasError}
            disabled={field.disabled}
            placeholder={field.placeholder}
            minRows={field.minRows || 3}
            maxRows={field.maxRows || 6}
          />
        );

      case 'select':
        return (
          <Select
            value={formData[field.name] ?? null}
            onChange={(e, value) =>
              handleChange(field.name, value ? String(value) : "")
            }
            disabled={field.disabled || field.loading}
            placeholder={
              field.loading ? "Loading..." : field.placeholder
            }
            color={hasError ? "danger" : "neutral"}
          >
            {field.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={formData[field.name] ?? ''}
            onChange={(e) => handleChange(field.name, Number(e.target.value))}
            error={hasError}
            disabled={field.disabled}
            placeholder={field.placeholder}
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={hasError}
            disabled={field.disabled}
            placeholder={field.placeholder}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={hasError}
            disabled={field.disabled}
            placeholder={field.placeholder}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={hasError}
            disabled={field.disabled}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ minWidth: { xs: '90%', sm: 500 } }}>
        <ModalClose />
        <Typography level="h4">
          {title}
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 ,overflowY: 'auto', maxHeight: '70vh', pr: 1}}>
          {fields.map((field) => (
            <FormControl key={field.name} error={!!errors[field.name]}>
              <FormLabel>
                {field.label}
                {field.required && <span style={{ color: 'red' }}> *</span>}
              </FormLabel>
              {renderField(field)}
              {errors[field.name] && (
                <Typography level="body-sm" color="danger">
                  {errors[field.name]}
                </Typography>
              )}
            </FormControl>
          ))}

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
