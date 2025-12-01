/**
 * Tests for Single Block Plugin Scaffold Generator Agent
 *
 * @jest-environment node
 */

const {
	CONFIG_SCHEMA,
	BLOCK_CATEGORIES,
	validateValue,
	validateConfig,
	applyDefaults,
	buildCommand,
	getStageQuestions,
} = require( '../../.github/agents/scaffold-generator.agent' );

describe( 'Single Block Scaffold Generator Agent', () => {
	describe( 'CONFIG_SCHEMA', () => {
		it( 'should have required stage 1 fields', () => {
			const requiredFields = Object.entries( CONFIG_SCHEMA )
				.filter(
					( [ , schema ] ) => schema.required && schema.stage === 1
				)
				.map( ( [ key ] ) => key );

			expect( requiredFields ).toContain( 'slug' );
			expect( requiredFields ).toContain( 'name' );
		} );

		it( 'should have block configuration in stage 2', () => {
			const stage2Fields = Object.entries( CONFIG_SCHEMA )
				.filter( ( [ , schema ] ) => schema.stage === 2 )
				.map( ( [ key ] ) => key );

			expect( stage2Fields ).toContain( 'block_category' );
			expect( stage2Fields ).toContain( 'block_icon' );
			expect( stage2Fields ).toContain( 'block_supports' );
		} );

		it( 'should have valid block categories', () => {
			expect( BLOCK_CATEGORIES ).toContain( 'text' );
			expect( BLOCK_CATEGORIES ).toContain( 'media' );
			expect( BLOCK_CATEGORIES ).toContain( 'design' );
			expect( BLOCK_CATEGORIES ).toContain( 'widgets' );
			expect( BLOCK_CATEGORIES ).toContain( 'common' );
		} );
	} );

	describe( 'validateValue', () => {
		describe( 'slug validation', () => {
			const slugSchema = CONFIG_SCHEMA.slug;

			it( 'should accept valid slugs', () => {
				expect(
					validateValue( 'slug', 'my-block', slugSchema )
				).toHaveLength( 0 );
				expect(
					validateValue( 'slug', 'block-123', slugSchema )
				).toHaveLength( 0 );
			} );

			it( 'should reject invalid slugs', () => {
				expect(
					validateValue( 'slug', 'My-Block', slugSchema ).length
				).toBeGreaterThan( 0 );
				expect(
					validateValue( 'slug', 'my_block', slugSchema ).length
				).toBeGreaterThan( 0 );
			} );
		} );

		describe( 'block category validation', () => {
			const categorySchema = CONFIG_SCHEMA.block_category;

			it( 'should accept valid categories', () => {
				BLOCK_CATEGORIES.forEach( ( cat ) => {
					expect(
						validateValue( 'category', cat, categorySchema )
					).toHaveLength( 0 );
				} );
			} );

			it( 'should reject invalid categories', () => {
				expect(
					validateValue(
						'category',
						'invalid-category',
						categorySchema
					).length
				).toBeGreaterThan( 0 );
			} );
		} );

		describe( 'array validation', () => {
			const supportsSchema = CONFIG_SCHEMA.block_supports;

			it( 'should accept valid supports array', () => {
				expect(
					validateValue(
						'supports',
						[ 'align', 'anchor' ],
						supportsSchema
					)
				).toHaveLength( 0 );
			} );

			it( 'should reject invalid supports values', () => {
				expect(
					validateValue(
						'supports',
						[ 'invalid-support' ],
						supportsSchema
					).length
				).toBeGreaterThan( 0 );
			} );
		} );
	} );

	describe( 'validateConfig', () => {
		it( 'should validate minimal valid config', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
			};

			const result = validateConfig( config );
			expect( result.valid ).toBe( true );
			expect( result.errors ).toHaveLength( 0 );
		} );

		it( 'should validate config with block settings', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
				block_category: 'design',
				block_icon: 'star-filled',
				block_supports: [ 'align', 'color', 'spacing' ],
			};

			const result = validateConfig( config );
			expect( result.valid ).toBe( true );
		} );

		it( 'should fail for missing required fields', () => {
			const config = {
				block_category: 'common',
			};

			const result = validateConfig( config );
			expect( result.valid ).toBe( false );
			expect( result.errors.some( ( e ) => e.includes( 'slug' ) ) ).toBe(
				true
			);
			expect( result.errors.some( ( e ) => e.includes( 'name' ) ) ).toBe(
				true
			);
		} );
	} );

	describe( 'applyDefaults', () => {
		it( 'should apply default block settings', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
			};

			const result = applyDefaults( config );

			expect( result.block_category ).toBe( 'common' );
			expect( result.block_icon ).toBe( 'block-default' );
			expect( result.block_supports ).toEqual( [ 'align', 'anchor' ] );
		} );

		it( 'should derive textdomain from slug', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
			};

			const result = applyDefaults( config );

			expect( result.textdomain ).toBe( 'my-block' );
		} );

		it( 'should derive namespace from slug', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
			};

			const result = applyDefaults( config );

			expect( result.namespace ).toBe( 'my_block' );
		} );
	} );

	describe( 'buildCommand', () => {
		it( 'should generate valid command string', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
			};

			const command = buildCommand( config );

			expect( command ).toContain( 'generate-single-block-plugin.js' );
			expect( command ).toContain( '--slug' );
			expect( command ).toContain( 'my-block' );
		} );

		it( 'should handle array values', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
				block_supports: [ 'align', 'color' ],
			};

			const command = buildCommand( config );

			expect( command ).toContain( '--block_supports' );
			expect( command ).toContain( 'align,color' );
		} );
	} );

	describe( 'getStageQuestions', () => {
		it( 'should return identity questions for stage 1', () => {
			const questions = getStageQuestions( 1 );

			expect( questions.some( ( q ) => q.key === 'slug' ) ).toBe( true );
			expect( questions.some( ( q ) => q.key === 'name' ) ).toBe( true );
			expect( questions.some( ( q ) => q.key === 'description' ) ).toBe(
				true
			);
		} );

		it( 'should return block config questions for stage 2', () => {
			const questions = getStageQuestions( 2 );

			expect(
				questions.some( ( q ) => q.key === 'block_category' )
			).toBe( true );
			expect( questions.some( ( q ) => q.key === 'block_icon' ) ).toBe(
				true
			);
		} );

		it( 'should return version questions for stage 3', () => {
			const questions = getStageQuestions( 3 );

			expect( questions.some( ( q ) => q.key === 'version' ) ).toBe(
				true
			);
			expect( questions.some( ( q ) => q.key === 'requires_wp' ) ).toBe(
				true
			);
		} );

		it( 'should return license questions for stage 4', () => {
			const questions = getStageQuestions( 4 );

			expect( questions.some( ( q ) => q.key === 'license' ) ).toBe(
				true
			);
		} );
	} );

	describe( 'edge cases', () => {
		it( 'should handle empty supports array', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
				block_supports: [],
			};
			const result = validateConfig( config );
			expect( result.valid ).toBe( true );
		} );

		it( 'should handle all supported block supports', () => {
			const config = {
				slug: 'my-block',
				name: 'My Block',
				block_supports: [
					'align',
					'anchor',
					'color',
					'spacing',
					'typography',
					'html',
				],
			};
			const result = validateConfig( config );
			expect( result.valid ).toBe( true );
		} );
	} );
} );
