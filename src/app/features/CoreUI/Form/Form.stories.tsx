import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import '../../App/Root/Root.scss';
import FormInput from '../FormInput/FormInput';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import Label from '../Label/Label';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import CheckBox from '../CheckBox/CheckBox';
import Select from '../Select/Select';
import MultiSelect from '../MultiSelect/MultiSelect';

export default { title: 'Form' };

interface FormData {
  firstname: string;
  lastname: string;
  country: string;
  category: string;
  email: string;
  phone?: string;
  marketing: boolean;
  agree: boolean;
  weeklytips: boolean;
  newfeatures: boolean;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const mapSubmitHandler = useCallback((data) => onSubmit(data), [onSubmit]);

  return (
    <form onSubmit={handleSubmit(mapSubmitHandler)}>
      <TwoColumnGrid>
        <FormInput
          fillWidth
          label='Firstname *'
          name='firstname'
          ref={register({ required: true })}
          error={errors.firstname && 'First name is required.'}
        />
        <FormInput
          fillWidth
          label='Lastname *'
          name='lastname'
          ref={register({ required: true })}
          error={errors.lastname && 'Last name is required.'}
        />

        <Label title='Select Countries'>
          <Select
            name='country'
            options={[
              { text: 'London', value: 'London' },
              { text: 'Washington', value: 'Washington' },
              { text: 'Madrid', value: 'Madrid' },
              { text: 'Paris', value: 'Paris' },
              { text: 'Rome', value: 'Rome' },
            ]}
            selected={'Rome'}
            defaultLabel='Select Locations'
            fillWidth
            ref={register({})}
          />
        </Label>

        <Label title='Select Categories'>
          <MultiSelect
            name='category'
            options={[
              { text: 'Finance', value: 'finance' },
              { text: 'Food', value: 'food' },
              { text: 'Sports', value: 'sports' },
            ]}
            defaultLabel='Select Category'
            fillWidth
            ref={register({})}
          />
        </Label>

        <FormInput
          fillWidth
          label='Phone Number'
          name='phone'
          ref={register({})}
        />
        <FormInput
          fillWidth
          label='E-Mail *'
          name='email'
          type='email'
          ref={register({ required: true })}
          error={errors.email && 'E-Mail is required.'}
        />
        <Toggle
          name='newfeatures'
          label='I want to be the first to hear about new features'
          defaultValue
          ref={register({})}
        />
        

        <CheckBox
          name='agree'
          label='I accept the user agreements.'
          ref={register({})}
        />
        <Button size='big' type='submit'>Submit</Button>
      </TwoColumnGrid>
    </form>
  );
};

export const normal = () => (
  <Form onSubmit={action('submit')} />
);
