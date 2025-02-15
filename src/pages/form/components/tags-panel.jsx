// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Container, Header, TagEditor } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import { tagEditorI18nStrings } from '../../../i18n-strings';

export default function TagsPanel({ loadHelpPanelContent, readOnlyWithErrors = false }) {
  const [tags, setTags] = useState([{ key: '', value: '' }]);

  return (
    <Container
      id="tags-panel"
      header={
        <Header
          variant="h2"
          info={<InfoLink onFollow={() => loadHelpPanelContent(10)} ariaLabel={'Information about tags.'} />}
          description="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your AWS costs."
        >
          Tags
        </Header>
      }
    >
      <TagEditor
        i18nStrings={tagEditorI18nStrings}
        tags={tags}
        onChange={({ detail }) => {
          const { tags } = detail;
          !readOnlyWithErrors && setTags(tags);
        }}
        keysRequest={() => window.FakeServer.GetTagKeys().then(({ TagKeys }) => TagKeys)}
        valuesRequest={key => window.FakeServer.GetTagValues(key).then(({ TagValues }) => TagValues)}
      />
    </Container>
  );
}
