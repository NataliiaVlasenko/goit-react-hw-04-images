import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FaSearchengin } from 'react-icons/fa';
import {
  FormSearch,
  ButtonLabel,
  SearchbarStyled,
  Button,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (searchQuery, actions) => {
    await onSubmit(searchQuery.searchQuery);

    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <SearchbarStyled>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormSearch>
            
            <Button type="submit" disabled={isSubmitting}>
            <FaSearchengin size={30} />
              <ButtonLabel>Search</ButtonLabel>
            </Button>

            <Input
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </FormSearch>
        )}
      </Formik>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
