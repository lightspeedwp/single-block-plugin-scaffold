/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	SelectControl,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';

/**
 * Block edit function.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates block attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content, alignment } = attributes;

	const blockProps = useBlockProps( {
		className: `has-text-align-${alignment}`,
	} );

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ alignLeft }
						label={ __( 'Align text left', '{{textdomain}}' ) }
						isPressed={ alignment === 'left' }
						onClick={ () => onChangeAlignment( 'left' ) }
					/>
					<ToolbarButton
						icon={ alignCenter }
						label={ __( 'Align text center', '{{textdomain}}' ) }
						isPressed={ alignment === 'center' }
						onClick={ () => onChangeAlignment( 'center' ) }
					/>
					<ToolbarButton
						icon={ alignRight }
						label={ __( 'Align text right', '{{textdomain}}' ) }
						isPressed={ alignment === 'right' }
						onClick={ () => onChangeAlignment( 'right' ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', '{{textdomain}}' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Text Alignment', '{{textdomain}}' ) }
						value={ alignment }
						options={ [
							{ label: __( 'Left', '{{textdomain}}' ), value: 'left' },
							{ label: __( 'Center', '{{textdomain}}' ), value: 'center' },
							{ label: __( 'Right', '{{textdomain}}' ), value: 'right' },
						] }
						onChange={ onChangeAlignment }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wp-block-{{namespace}}-{{slug}}__content">
					<RichText
						tagName="p"
						placeholder={ __( 'Enter your content here...', '{{textdomain}}' ) }
						value={ content }
						onChange={ onChangeContent }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/link',
							'core/strikethrough',
						] }
					/>
				</div>
			</div>
		</>
	);
}