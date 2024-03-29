import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Default = (props) => {
    const [t] = useTranslation();

    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <h1 className="display-3">404</h1>
                    <h1>error</h1>
                    <h2>{t('Not Found')}</h2>
                </div>
            </div>
        </div>
    );
};

export default Default;
