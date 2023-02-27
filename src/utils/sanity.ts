import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  token: process.env.REACT_APP_SANITY_API_TOKEN,
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  apiVersion: '2021-11-16', // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production',
});

/* Setup the helper function for generationg image URLs whit only the asset reference data in documents. https://sanity.io/docs/image-url */

export const urlFor = (source: any) =>
  createImageUrlBuilder(client).image(source);
