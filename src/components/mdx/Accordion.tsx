import { Accordion as _Accordion, Accordions } from 'fumadocs-ui/components/accordion'

export const Accordion = ((p) => (
	<Accordions type="single">
		<_Accordion {...p} />
	</Accordions>
)) as typeof _Accordion
