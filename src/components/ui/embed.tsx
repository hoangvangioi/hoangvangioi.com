import { EMBED_ELEMENT } from '@config'

export default function Embed() {
	return <div className="mx-auto mt-5" dangerouslySetInnerHTML={{ __html: EMBED_ELEMENT }}></div>
}
