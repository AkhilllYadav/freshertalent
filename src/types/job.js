
// This file provides documentation for the job-related data structures
// since we're now using JavaScript

/**
 * @typedef {Object} Company
 * @property {string} id
 * @property {string} name
 * @property {string} [logo]
 * @property {string} [website]
 * @property {string} [location]
 */

/**
 * @typedef {Object} JobLocation
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} country
 * @property {boolean} remote
 */

/**
 * @typedef {Object} JobTag
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} title
 * @property {Company} company
 * @property {JobLocation} location
 * @property {Object} [salary]
 * @property {number} [salary.min]
 * @property {number} [salary.max]
 * @property {string} salary.currency
 * @property {'hourly'|'monthly'|'yearly'} salary.period
 * @property {'full-time'|'part-time'|'contract'|'freelance'|'internship'} employmentType
 * @property {string} description
 * @property {string[]} requirements
 * @property {string[]} responsibilities
 * @property {JobTag[]} tags
 * @property {string} postedAt
 * @property {string} applyUrl
 * @property {boolean} [featured]
 */

// We're exporting empty objects just to maintain the structure of the imports
// in the existing code, but in JavaScript these aren't actual types
export const jobTypes = {};
