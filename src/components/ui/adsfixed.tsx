import React from 'react'
import { ADSFIXED_S, ADSFIXED_L } from '@config'

export default function AdsFixed() {
	return (
		<div aria-label="adsfixed" className='mt-5'>
			<p className="my-2 text-center text-sm text-gray-400">Quảng cáo giúp chúng tôi duy trì trang web này</p>
			<div className="hidden sm:block" dangerouslySetInnerHTML={{ __html: ADSFIXED_L }} />
			<div className="block sm:hidden" dangerouslySetInnerHTML={{ __html: ADSFIXED_S }} />
		</div>
	)
}
