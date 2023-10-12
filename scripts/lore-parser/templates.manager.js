class TemplatesManager {
    static addTemplate(template) {
        TemplatesManager.templates.add(template);
    }
    static removeTemplate(template) {
        TemplatesManager.templates.delete(template);
    }
    static getTemplates(lore) {
        let templatesMap = new Map();
        let loreTemplates = [];
        let clearedLore = lore.map((line) => line.replace(TemplatesManager.clearRegex, ''));
        const multipleTemplates = clearedLore.findIndex((line) => line.includes(TemplatesManager.TEMPLATE_END_MARKER));
        let lineBuffer = [];
        if (multipleTemplates !== -1) {
            for (let loreLine of clearedLore) {
                lineBuffer.push(loreLine);
                if (loreLine.includes(TemplatesManager.TEMPLATE_END_MARKER)) {
                    loreTemplates.push(lineBuffer);
                    lineBuffer = [];
                }
            }
        }
        else {
            loreTemplates = [clearedLore];
        }
        TemplatesManager.templates.forEach((template) => {
            for (const loreTemplate of loreTemplates) {
                const clearedTemplate = template.shape.map((line) => {
                    // remove all text between Template Marker
                    line = line.replace(TemplatesManager.clearRegex, '');
                    // remove all § + the following char
                    line = line.replace(TemplatesManager.clearColorsRegex, '');
                    return line;
                });
                console.warn(template.name, ' / ', loreTemplate.join(' ').replace(TemplatesManager.clearColorsRegex, '').replace(TemplatesManager.clearRegex, ''));
                console.warn(template.name, ' / ', clearedTemplate.join(' '));
                if (loreTemplate
                    .join(' ')
                    .replace(TemplatesManager.clearColorsRegex, '')
                    .replace(TemplatesManager.clearRegex, '')
                    .replace(TemplatesManager.clearColorsRegex, '') === clearedTemplate.join(' ')) {
                    templatesMap.set(template.name, template);
                }
            }
        });
        return templatesMap;
    }
}
TemplatesManager.MARKER = '§×';
TemplatesManager.TEMPLATE_END_MARKER = '§∞';
TemplatesManager.clearRegex = new RegExp(`${TemplatesManager.MARKER}[^${TemplatesManager.MARKER}]+${TemplatesManager.MARKER}`, 'gi');
TemplatesManager.clearColorsRegex = new RegExp(`§(?!${TemplatesManager.MARKER[1]}|${TemplatesManager.TEMPLATE_END_MARKER[1]}).`, 'gi');
TemplatesManager.templates = new Set();
export default TemplatesManager;
