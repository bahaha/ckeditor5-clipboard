/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module clipboard/utils/viewtoplaintext
 */

/**
 * Deeply converts {@link module:engine/model/view/item view item} to plain text.
 *
 * @param {module:engine/model/view/item} viewItem View item to convert.
 * @returns {String} Plain text representation of `viewItem`.
 */
export default function viewToPlainText( viewItem ) {
	let text = '';

	if ( viewItem.is( 'text' ) || viewItem.is( 'textProxy' ) ) {
		// If item is `Text` or `TextProxy` simple take its text data.
		text = viewItem.data;
	} else if ( viewItem.is( 'img' ) && viewItem.hasAttribute( 'alt' ) ) {
		// Special case for images - use alt attribute if it is provided.
		text = viewItem.getAttribute( 'alt' );
	} else {
		// Other elements are document fragments, attribute elements or container elements.
		// They don't have their own text value, so convert their children.
		let prev = null;

		for ( let child of viewItem.getChildren() ) {
			const childText = viewToPlainText( child );

			// Separate container element children with one or more new-line characters.
			if ( prev && ( prev.is( 'containerElement' ) || child.is( 'containerElement' ) ) ) {
				if ( smallPaddingElements.includes( prev.name ) || smallPaddingElements.includes( child.name ) ) {
					text += '\n';
				} else {
					text += '\n\n';
				}
			}

			text += childText;
			prev = child;
		}
	}

	return text;
}

// Elements which should not have empty-line padding.
// Most `view.ContainerElement` want to be separate by new-line, but some are creating one structure
// together (like `<li>`) so it is better to separate them by only one "\n".
const smallPaddingElements = [ 'figcaption', 'li' ];
