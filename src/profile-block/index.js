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
    URLInputButton,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 
	metadata.name, 
	{
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
            <div className="profile-block-editor">
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
                <RichText
                    tagName="h3"
                    value={name}
                    onChange={(value) => setAttributes({ name: value })}
                    placeholder="Enter name"
                />
                <RichText
                    tagName="p"
                    value={bio}
                    onChange={(value) => setAttributes({ bio: value })}
                    placeholder="Enter bio"
                />
                <TextControl
                    label="Contact Button Text"
                    value={contactText}
                    onChange={(value) => setAttributes({ contactText: value })}
                />
                <URLInputButton
                    label="Contact Button URL"
                    url={contactUrl}
                    onChange={(value) => setAttributes({ contactUrl: value })}
                />
                <div className="social-links-editor">
                    <h4>Social Links</h4>
                    {socialLinks.map((social, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <TextControl
                                label={`${social.platform} URL`}
                                value={social.url}
                                onChange={(url) =>
                                    updateSocialLink(index, { url })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
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
                <a href={contactUrl} className="profile-contact-button">
                    {contactText}
                </a>
                <div className="social-links">
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
