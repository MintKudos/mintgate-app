import React from 'react';
import {
  DocumentPlusIcon,
  RectangleGroupIcon,
  CogIcon,
  SparklesIcon,
  AdjustmentsVerticalIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import ALink from 'components/ALink';

export default function QuickLinks() {
  const adminIcons = [
    <DocumentPlusIcon className="w-6 h-6 text-primary" />,
    <RectangleGroupIcon className="w-6 h-6 text-primary" />,
    <AdjustmentsVerticalIcon className="w-6 h-6 text-primary" />,
    <CogIcon className="w-6 h-6 text-primary" />,
    <SparklesIcon className="w-6 h-6 text-primary" />,
    <UserGroupIcon className="w-6 h-6 text-primary" />,
  ];

  const adminPages = [
    {
      title: 'Create New Project',
      subtitle: 'Start a crowdfund project and share it with your friends',
      icon: adminIcons[0],
      href: '/new_project',
    },
    {
      title: 'My Items',
      subtitle: 'Manage your creations',
      icon: adminIcons[1],
      href: '/admin/myprojects',
    },
    {
      title: 'Platform Settings',
      subtitle: 'Configure your platform',
      icon: adminIcons[2],
      href: '/admin/mydomain',
    },
    {
      title: 'Collaborators',
      subtitle: 'Add collaborators to mint on your whitelabel',
      icon: adminIcons[5],
      href: '/admin/mycollaborators',
    },
    {
      title: 'User Settings',
      subtitle: 'Manage your user details',
      icon: adminIcons[3],
      href: '/settings',
    },
    {
      title: 'Page Editor',
      subtitle: 'Apply your own style and layout',
      icon: adminIcons[4],
      href: '/?theme_editor',
    },
  ];

  return (
    <div>
      <section aria-labelledby="quick-links-title">
        <div className="sm:grid sm:grid-cols-3 gap-2 sm:gap-4">
          <h2 className="sr-only" id="quick-links-title">
            Quick links
          </h2>

          {adminPages.map((page) => (
            <ALink
              id={page.title}
              key={page?.title}
              href={page.href}
              title={page.title}
            >
              <div className="mt-4 lg:mt-0 transition duration-450 ease-in-out transform hover:scale-101 hover:-translate-y-1 hover:ring-2 hover:ring-primary hover:ring-opacity-50 border border-base-300 cursor-pointer shadow-mg hover:shadow-mgXL rounded-box relative group bg-base-200 py-6 px-6 border-box overflow-hidden">
                <div className="flex flex-row items-center space-x-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-box bg-primary bg-opacity-10">
                    {page.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="flex text-lg caption text-base-content">
                      {page.title}
                    </h3>
                    <p className="flex bodytext-small text-base-content opacity-80">
                      {page.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </ALink>
          ))}
        </div>
      </section>
    </div>
  );
}
