import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Canada.ca Government Breadcrumb Component
 * Uses standard '>' separator and blue links.
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="gov-breadcrumbs" aria-label="Breadcrumb">
      <div className="gov-container">
        <ol className="gov-breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li className="gov-breadcrumbs-item">
                  {item.url && !isLast ? (
                    <Link to={item.url}>{item.label}</Link>
                  ) : (
                    <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                  )}
                </li>
                {!isLast && (
                  <li className="gov-breadcrumbs-separator" aria-hidden="true">
                    &gt;
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
