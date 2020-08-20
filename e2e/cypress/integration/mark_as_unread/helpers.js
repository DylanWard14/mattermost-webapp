// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as TIMEOUTS from '../../fixtures/timeouts';

export function beRead(items) {
    expect(items).to.have.length(1);
    expect(items[0].className).to.not.match(/unread-title/);
}

export function beUnread(items) {
    expect(items).to.have.length(1);
    expect(items[0].className).to.match(/unread-title/);
}

export function markAsUnreadByPostIdFromMenu(postId, prefix = 'post', location = 'CENTER') {
    cy.get(`#${prefix}_${postId}`).trigger('mouseover');
    cy.clickPostDotMenu(postId, location);
    cy.get('.dropdown-menu').
        should('be.visible').
        within(() => {
            cy.findByText('Mark as Unread').scrollIntoView().should('be.visible').click();
        });
}

export function switchToChannel(channel) {
    cy.get(`#sidebarItem_${channel.name}`).click();

    cy.get('#channelHeaderTitle').should('contain', channel.display_name);

    // # Wait some time for the channel to set state
    cy.wait(TIMEOUTS.HALF_SEC);
}

export function verifyPostNextToNewMessageSeparator(message) {
    cy.get('.NotificationSeparator').should('exist').parent().parent().parent().next().should('contain', message);
}
