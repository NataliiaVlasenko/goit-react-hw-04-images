import { ColorRing} from 'react-loader-spinner';
import styled from '@emotion/styled';

export const Spinner = styled(ColorRing)`
visible={true}
  height="80";
  width="80";
  align-items: center;
  ariaLabel="blocks-loading";
  wrapperStyle={{}};
  wrapperClass="blocks-wrapper";
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87'];
  `;