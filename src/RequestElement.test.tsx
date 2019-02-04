import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import * as shareKit from '@bloomprotocol/share-kit'

import {RequestElement} from './RequestElement'
import {Action, QROptions, RequestData} from '../'

const requestData: RequestData = {
  action: Action.attestation,
  token: 'token',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}
const requestData2: RequestData = {
  action: Action.attestation,
  token: 'token 2',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}

const qrOptions: Partial<QROptions> = {size: 300}

describe('RequestElement', () => {
  afterEach(cleanup)

  test('calls renderRequestElement with correct params', () => {
    const shareKitSpy = jest.spyOn(shareKit, 'renderRequestElement')
    const called: string[] = []

    render(
      <RequestElement
        requestData={requestData}
        qrOptions={qrOptions}
        shouldRenderButton={() => {
          called.push('shouldRenderButton')
          return true
        }}
      />
    )

    expect(shareKitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        container: expect.any(HTMLElement),
        requestData: expect.objectContaining(requestData),
        qrOptions: expect.objectContaining(qrOptions),
        shouldRenderButton: expect.any(Function),
      })
    )
    expect(called).toHaveLength(1)
    expect(called).toContain('shouldRenderButton')
  })

  describe('updates when', () => {
    test('requestData changes', () => {
      const result = render(
        <RequestElement requestData={requestData} qrOptions={qrOptions} shouldRenderButton={() => true} />
      )

      const href = result.container.querySelector('a')!.href
      const requestQuery = href.replace('https://bloom.co/download?request=', '')

      expect(JSON.parse(window.atob(requestQuery))).toMatchSnapshot()

      result.rerender(
        <RequestElement requestData={requestData2} qrOptions={qrOptions} shouldRenderButton={() => true} />
      )

      const href2 = result.container.querySelector('a')!.href
      const requestQuery2 = href2.replace('https://bloom.co/download?request=', '')

      expect(JSON.parse(window.atob(requestQuery2))).toMatchSnapshot()
    })
  })
})
