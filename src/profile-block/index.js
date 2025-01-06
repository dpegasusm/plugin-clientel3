/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import the Icon for this block from wordpress.
 */
import { commentAuthorAvatar as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';

import {
    InspectorControls,
    MediaUpload,
    RichText,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Register the block type.
 */
/**
 * Register the block type.
 */
registerBlockType(metadata.name, {
    title: 'Staff Profile',
    icon: icon,
    category: 'widgets',
    attributes: {
        imageUrl: { type: 'string', default: '' },
        name: { type: 'string', default: 'Name' },
        bio: { type: 'string', default: 'Bio' },
        contactText: { type: 'string', default: 'Contact' },
        contactUrl: { type: 'string', default: '#' },
        socialLinks: {
            type: 'array',
            default: [
                { platform: 'LinkedIn', url: '' },
                { platform: 'Instagram', url: '' },
                { platform: 'Facebook', url: '' },
            ],
        },
    },
    edit({ attributes, setAttributes }) {
        const { imageUrl, name, bio, contactText, contactUrl, socialLinks } = attributes;

        const updateSocialLink = (index, newValue) => {
            const updatedLinks = [...socialLinks];
            updatedLinks[index] = { ...updatedLinks[index], ...newValue };
            setAttributes({ socialLinks: updatedLinks });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Contact Settings" initialOpen={true}>
                        <TextControl
                            label="Contact Button URL"
                            value={contactUrl}
                            onChange={(value) => setAttributes({ contactUrl: value })}
                        />
                    </PanelBody>
                    <PanelBody title="Social Links" initialOpen={true}>
                        {socialLinks.map((social, index) => (
                            <TextControl
                                key={index}
                                label={`${social.platform} URL`}
                                value={social.url}
                                onChange={(url) =>
                                    updateSocialLink(index, { url })
                                }
                            />
                        ))}
                    </PanelBody>
                </InspectorControls>

                <div className="profile-block-editor">
                    {/* Image Upload */}
                    <div className="profile-block-image">
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({ imageUrl: media.url })
                            }
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} isPrimary>
                                    {imageUrl ? 'Change Image' : 'Upload Image'}
                                </Button>
                            )}
                        />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Profile Image"
                                style={{ maxWidth: '100%', marginTop: '10px' }}
                            />
                        )}
                    </div>

                    {/* Name */}
                    <RichText
                        tagName="h3"
                        value={name}
                        onChange={(value) => setAttributes({ name: value })}
                        placeholder="Enter name"
                    />

                    {/* Bio */}
                    <RichText
                        tagName="p"
                        value={bio}
                        onChange={(value) => setAttributes({ bio: value })}
                        placeholder="Enter bio"
                    />

                    {/* Contact Button */}
                    <div className="wp-block-buttons">
                        <div className="wp-block-button has-custom-font-size has-extra-small-font-size">
                            <a
                                className="wp-block-button__link has-black-color has-green-background-color has-text-color has-background has-link-color wp-element-button"
                                href={contactUrl || '#'}
                            >
                                <RichText
                                    tagName="span"
                                    value={contactText}
                                    onChange={(value) =>
                                        setAttributes({ contactText: value })
                                    }
                                    placeholder="Contact Button Text"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div
                        className="wp-block-coblocks-social-profiles alignwide"
                        data-size="sml"
                        data-text-align="center"
                    >
                        {socialLinks.map(
                            (social, index) =>
                                social.url && (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`social-link social-${social.platform.toLowerCase()}`}
                                    >
                                        {social.platform}
                                    </a>
                                )
                        )}
                    </div>
                </div>
            </>
        );
    },
    save({ attributes }) {
        const { imageUrl, name, bio, contactText, contactUrl, socialLinks } = attributes;

        return (
            <div className="profile-block">
                {imageUrl && (
                    <img src={imageUrl} alt="Profile Image" className="profile-image" />
                )}
                <h3 className="profile-name">{name}</h3>
                <p className="profile-bio">{bio}</p>

                {/* Contact Button */}
                <div className="wp-block-buttons">
                    <div className="wp-block-button has-custom-font-size has-extra-small-font-size">
                        <a
                            className="wp-block-button__link has-black-color has-green-background-color has-text-color has-background has-link-color wp-element-button"
                            href={contactUrl}
                        >
                            {contactText}
                        </a>
                    </div>
                </div>

                {/* Social Links */}
                <div
                    className="wp-block-coblocks-social-profiles alignwide"
                    data-size="sml"
                    data-text-align="center"
                >
                    {socialLinks.map(
                        (social, index) =>
                            social.url && (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`social-link social-${social.platform.toLowerCase()}`}
                                >
                                    {social.platform}
                                </a>
                            )
                    )}
                </div>
            </div>
        );
    },
});
