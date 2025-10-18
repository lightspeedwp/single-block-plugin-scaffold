/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Block save function.
 *
 * @param {Object} props               Properties passed to the function.
 * @param {Object} props.attributes    Block attributes.
 *
 * @return {Element} Element to render.
 */
export default function Save( { attributes } ) {
	const { content, alignment } = attributes;

	const blockProps = useBlockProps.save( {
		className: `has-text-align-${alignment}`,
	} );

	return (
		<div { ...blockProps }>
			<div className="wp-block-{{namespace}}-{{slug}}__content">
				<RichText.Content tagName="p" value={ content } />
			</div>
		</div>
	);
}