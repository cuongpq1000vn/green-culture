// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    console.log('🚀 Setting up migration permissions...')
    
    try {
      // Get the public role
      const publicRole = await strapi.plugin('users-permissions').service('role').findOne({ type: 'public' })
      
      if (!publicRole) {
        console.log('❌ Public role not found')
        return
      }
      
      console.log(`📍 Found Public role with ID: ${publicRole.id}`)
      
      // Content types that need CREATE permissions
      const contentTypesToEnable = [
        'certification',
        'product-category',
        'product', 
        'stat',
        'testimonial',
        'global-partner',
        'facility',
        'process-step',
        'blog-post',
        'landing-page',
        'site-setting', 
        'navigation'
      ]
      
      let permissionsUpdated = false
      
      // Enable permissions for each content type
      for (const contentType of contentTypesToEnable) {
        
        // For single types (landing-page, site-setting, navigation)
        if (['landing-page', 'site-setting', 'navigation'].includes(contentType)) {
          const actions = ['find', 'update']
          
          for (const action of actions) {
            try {
              await strapi.plugin('users-permissions').service('permission').create({
                role: publicRole.id,
                type: `api::${contentType}.${contentType}`,
                controller: contentType,
                action: action,
                enabled: true,
                policy: ''
              })
              permissionsUpdated = true
            } catch (error) {
              // Permission might already exist, ignore the error
              console.log(`📝 Permission ${contentType}.${action} already exists or failed to create`)
            }
          }
        } else {
          // For collection types
          const actions = ['create', 'find', 'findOne']
          
          for (const action of actions) {
            try {
              await strapi.plugin('users-permissions').service('permission').create({
                role: publicRole.id,
                type: `api::${contentType}.${contentType}`,
                controller: contentType,
                action: action,
                enabled: true,
                policy: ''
              })
              permissionsUpdated = true
            } catch (error) {
              // Permission might already exist, ignore the error
              console.log(`📝 Permission ${contentType}.${action} already exists or failed to create`)
            }
          }
        }
      }
      
      if (permissionsUpdated) {
        console.log('✅ Migration permissions have been configured for Public role')
        console.log('📝 Content migration scripts should now work properly')
      } else {
        console.log('✅ Migration permissions already configured')
      }
      
    } catch (error) {
      console.error('❌ Failed to set up migration permissions:', error.message)
    }
  },
};
