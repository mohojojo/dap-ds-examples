import { createStore } from "solid-js/store";

type FormFields = {
  name?: string;
  prefix?: string;
};

const submit = (form: FormFields) => {
  const dataToSubmit = {
    name: form.name,
    prefix: form.prefix,
  };
  console.log(`submitting ${JSON.stringify(dataToSubmit)}`);
};

const useForm = () => {
  const [form, setForm] = createStore<FormFields>({
    name: "",
    prefix: "",
  });

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: ""
    });
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    if (inputElement.type === "checkbox") {
      setForm({
        [fieldName]: !!inputElement.checked
      });
    } else {
      setForm({
        [fieldName]: inputElement.value
      });
    }
  };

  return { form, submit, updateFormField, clearField };
};

export { useForm };
