/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module clipboard/clipboardobserver
 */

import DomEventObserver from '@ckeditor/ckeditor5-engine/src/view/observer/domeventobserver';
import DataTransfer from './datatransfer';

/**
 * {@link module:engine/view/document~Document#event:paste Paste} event observer.
 *
 * Note that this observer is not available by default. To make it available it needs to be added to
 * {@link module:engine/view/document~Document} by the {@link module:engine/view/document~Document#addObserver} method.
 *
 * @extends module:engine/view/observer/domeventobserver~DomEventObserver
 */
export default class ClipboardObserver extends DomEventObserver {
	constructor( doc ) {
		super( doc );

		this.domEventType = [ 'paste', 'copy', 'cut', 'drop' ];

		doc.on( 'paste', _handleInput, { priority: 'low' } );
		doc.on( 'drop', _handleInput, { priority: 'low' } );

		function _handleInput( evt, data ) {
			// Prevent page refreshing.
			data.preventDefault();

			doc.fire( 'input', { dataTransfer: data.dataTransfer } );
		}
	}

	onDomEvent( domEvent ) {
		this.fire( domEvent.type, domEvent, {
			dataTransfer: new DataTransfer( domEvent.clipboardData ? domEvent.clipboardData : domEvent.dataTransfer )
		} );
	}
}

/**
 * Fired when user dropped content into one of the editables.
 *
 * Introduced by {@link module:clipboard/clipboardobserver~ClipboardObserver}.
 *
 * Note that this event is not available by default. To make it available {@link module:clipboard/clipboardobserver~ClipboardObserver}
 * needs to be added to {@link module:engine/view/document~Document} by the {@link module:engine/view/document~Document#addObserver} method.
 * It's done by the {@link module:clipboard/clipboard~Clipboard} feature. If it's not loaded, it must be done manually.
 *
 * @see module:clipboard/clipboardobserver~ClipboardObserver
 * @event module:engine/view/document~Document#event:drop
 * @param {module:clipboard/clipboardobserver~ClipboardEventData} data Event data.
 */

/**
 * Fired when user pasted content into one of the editables.
 *
 * Introduced by {@link module:clipboard/clipboardobserver~ClipboardObserver}.
 *
 * Note that this event is not available by default. To make it available {@link module:clipboard/clipboardobserver~ClipboardObserver}
 * needs to be added to {@link module:engine/view/document~Document} by the {@link module:engine/view/document~Document#addObserver} method.
 * It's done by the {@link module:clipboard/clipboard~Clipboard} feature. If it's not loaded, it must be done manually.
 *
 * @see module:clipboard/clipboardobserver~ClipboardObserver
 * @event module:engine/view/document~Document#event:paste
 * @param {module:clipboard/clipboardobserver~ClipboardEventData} data Event data.
 */

/**
 * Fired when user copied content from one of the editables.
 *
 * Introduced by {@link module:clipboard/clipboardobserver~ClipboardObserver}.
 *
 * Note that this event is not available by default. To make it available {@link module:clipboard/clipboardobserver~ClipboardObserver}
 * needs to be added to {@link module:engine/view/document~Document} by the {@link module:engine/view/document~Document#addObserver} method.
 * It's done by the {@link module:clipboard/clipboard~Clipboard} feature. If it's not loaded, it must be done manually.
 *
 * @see module:clipboard/clipboardobserver~ClipboardObserver
 * @event module:engine/view/document~Document#event:copy
 * @param {module:clipboard/clipboardobserver~ClipboardEventData} data Event data.
 */

/**
 * Fired when user cut content from one of the editables.
 *
 * Introduced by {@link module:clipboard/clipboardobserver~ClipboardObserver}.
 *
 * Note that this event is not available by default. To make it available {@link module:clipboard/clipboardobserver~ClipboardObserver}
 * needs to be added to {@link module:engine/view/document~Document} by the {@link module:engine/view/document~Document#addObserver} method.
 * It's done by the {@link module:clipboard/clipboard~Clipboard} feature. If it's not loaded, it must be done manually.
 *
 * @see module:clipboard/clipboardobserver~ClipboardObserver
 * @event module:engine/view/document~Document#event:cut
 * @param {module:clipboard/clipboardobserver~ClipboardEventData} data Event data.
 */

/**
 * The value of the {@link module:engine/view/document~Document#event:paste},
 * {@link module:engine/view/document~Document#event:copy} and {@link module:engine/view/document~Document#event:cut} events.
 *
 * In order to access clipboard data use `dataTransfer` property.
 *
 * @class module:clipboard/clipboardobserver~ClipboardEventData
 * @extends module:engine/view/observer/domeventdata~DomEventData
 */

/**
 * Data transfer instance.
 *
 * @readonly
 * @member {module:clipboard/datatransfer~DataTransfer} module:clipboard/clipboardobserver~ClipboardEventData#dataTransfer
 */
