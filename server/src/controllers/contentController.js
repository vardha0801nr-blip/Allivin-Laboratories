import CompanyContent from "../models/CompanyContent.js";

export async function getContent(_req, res) {
  let content = await CompanyContent.findOne();
  if (!content) content = await CompanyContent.create({});
  res.json(content);
}

export async function updateContent(req, res) {
  let content = await CompanyContent.findOne();
  if (!content) content = await CompanyContent.create(req.body);
  else content = await CompanyContent.findByIdAndUpdate(content._id, req.body, { new: true, runValidators: true });
  res.json(content);
}
