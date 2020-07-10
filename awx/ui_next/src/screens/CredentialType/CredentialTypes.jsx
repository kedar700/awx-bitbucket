import React, { useState, useCallback } from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Route, Switch } from 'react-router-dom';

import CredentialTypeAdd from './CredentialTypeAdd';
import CredentialTypeList from './CredentialTypeList';
import CredentialType from './CredentialType';
import Breadcrumbs from '../../components/Breadcrumbs';

function CredentialTypes({ i18n }) {
  const [breadcrumbConfig, setBreadcrumbConfig] = useState({
    '/credential_types': i18n._(t`Credential Types`),
    '/credential_types/add': i18n._(t`Create Credential Types`),
  });

  const buildBreadcrumbConfig = useCallback(
    credentialTypes => {
      if (!credentialTypes) {
        return;
      }
      setBreadcrumbConfig({
        '/credential_types': i18n._(t`Credential Types`),
        '/credential_types/add': i18n._(t`Create Credential Types`),
        [`/credential_types/${credentialTypes.id}`]: `${credentialTypes.name}`,
      });
    },
    [i18n]
  );
  return (
    <>
      <Breadcrumbs breadcrumbConfig={breadcrumbConfig} />
      <Switch>
        <Route path="/credential_types/add">
          <CredentialTypeAdd />
        </Route>
        <Route path="/credential_types/:id">
          <CredentialType setBreadcrumb={buildBreadcrumbConfig} />
        </Route>
        <Route path="/credential_types">
          <CredentialTypeList />
        </Route>
      </Switch>
    </>
  );
}

export default withI18n()(CredentialTypes);
