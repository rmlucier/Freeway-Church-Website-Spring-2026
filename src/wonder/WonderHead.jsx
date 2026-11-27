import { Helmet } from 'react-helmet-async';
import './wonder.css';

// Wonder fonts. Only rendered while Wonder is on, so the site loads no extra
// fonts the rest of the year. (preconnect to Google Fonts is already in index.html.)
export default function WonderHead() {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700;800&family=Pacifico&display=swap"
      />
    </Helmet>
  );
}
