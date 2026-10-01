import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

type SidebarEntry = StarlightRouteData['sidebar'][number];
type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;

function normalizePath(path: string): string {
	return decodeURI(path).replace(/\/+$/, '');
}

// Directory groups use their landing page's title and put Overview first.
function formatGroups(entries: SidebarEntry[], parentPath: string): SidebarEntry[] {
	return entries.map((entry) => {
		if (entry.type === 'link') return entry;

		const groupPath = `${parentPath}/${entry.label}`;
		const children = formatGroups(entry.entries, groupPath);
		const overview = children.find(
			(child): child is SidebarLink =>
				child.type === 'link' && normalizePath(child.href) === groupPath,
		);

		return {
			...entry,
			label: overview?.label ?? entry.label,
			entries: overview
				? [{ ...overview, label: 'Overview' }, ...children.filter((child) => child !== overview)]
				: children,
		};
	});
}

function flattenLinks(entries: SidebarEntry[]): SidebarLink[] {
	return entries.flatMap((entry) =>
		entry.type === 'link' ? [entry] : flattenLinks(entry.entries),
	);
}

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	if (!route.hasSidebar) return;

	const id = route.locale ? route.id.slice(route.locale.length + 1) : route.id;
	const section = id.split('/')[0];
	const sectionPath = `${normalizePath(route.siteTitleHref)}/${section}`;
	const group = route.sidebar.find((entry) => entry.type === 'group' && entry.label === section);

	// Every top-level content directory is a section, including future directories.
	route.sidebar = group?.type === 'group'
		? formatGroups(
			group.entries.filter(
				(entry) => entry.type !== 'link' || normalizePath(entry.href) !== sectionPath,
			),
			sectionPath,
		)
		: [];
	route.hasSidebar = route.sidebar.length > 0;

	// Keep default previous/next links in the same order as the scoped sidebar.
	const links = flattenLinks(route.sidebar);
	const currentIndex = links.findIndex((link) => link.isCurrent);
	const isSectionIndex = normalizePath(context.url.pathname) === sectionPath;

	for (const direction of ['prev', 'next'] as const) {
		const setting = route.entry.data[direction];
		// Preserve disabled pagination and explicitly configured navigation links.
		if (!route.pagination[direction] || typeof setting === 'object') continue;

		const adjacent = direction === 'next' && isSectionIndex
			? links[0]
			: currentIndex >= 0
				? links[currentIndex + (direction === 'prev' ? -1 : 1)]
				: undefined;
		route.pagination[direction] = adjacent && {
			...adjacent,
			label: typeof setting === 'string' ? setting : adjacent.label,
		};
	}
});
