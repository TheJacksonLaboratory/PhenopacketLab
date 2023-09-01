Create General Phenopacket
==========================


To create a regular phenopacket, click the Create button on the
homepage. The Phenopacket Creator form will display a stepper
with Step 1 to Step 5. On the top right corner, click Show all
available steps. All steps for regular phenopacket will be displayed.

.. figure:: ../_static/60AllStepper.PNG

Step 1 to Step 6 are similar to the steps described in the section
Create Rare Disease Phenopacket except Step 3 Measurements and
Step 4 Biosample(s) have not been implemented for the current
version.

**Medical Action(s) Step**

This step allows the user to enter information with regards to a
medical action taken for any disease mentioned in the Phenopacket.
To add a new record for Medical Action(s), click the Add medical
action button. Select a Treatment target from the dropdown.
This list will consist of only the diseases mentioned in the
disease step of the given Phenopacket. The user can add several
medical actions or edit or delete existing medical actions.

.. figure:: ../_static/61AddMedicalAction.PNG

Treatment intent, Response to treatment, and Treatment termination
reason are various dropdowns that lets the user select more
details from the NCI Thesaurus ontology.

Adverse event(s) allows the user to search for and select from
the OAE (ontology of adverse events).

.. figure:: ../_static/62AdverseEvents.PNG

Select an action type (required), then various dropdowns will be
presented depending on the action type selected. This is the
treatment screen.

.. figure:: ../_static/63Treatment.PNG

For example, if the user selects an action type of Radiation
therapy, the system will display various dropdown fields
related to a Radiation Therapy treatment.

.. figure:: ../_static/64RadiationTherapy.PNG

When the user finishes adding information for a given medical
action, click on the Add Medical action button to save the
medical action record.

The user can add several medical actions or edit or delete
existing medical actions.

.. figure:: ../_static/65MedicalActionList.PNG

**File(s) Step**

The files section allows the user to describe external files that
may be linked with the phenotype data to inform analyses. Click
on the + Add file button.

.. figure:: ../_static/50AddFile.PNG

The URI (Uniform Resource Identifier) field is required.
The field must contain a link to a file on the web, usually
formatted as http://somewebsite/filename or to a file formatted
as file://some/path/file.txt.

Next click on the + Add Individual to File ID entry.

.. figure:: ../_static/51AddFileIdentifier.PNG

Note that the Individual ID is filled in and is the user
specified ID for this phenopacket. Click on the edit icon
(pencil) to add the File Identifier. The row changes to
provide an entry box for the file identifier. Click the
green check mark to save it.

.. figure:: ../_static/52EnterFileIdentifier.PNG

Click on the + Add file attributes button. Three rows are added
for entering genomeAssembly, fileFormat, and description. These
are optional, if some are not needed, use the trash icon to
remove them. Use the edit icon to enter the values.
GenomeAssembly and fileFormat provide a dropdown list for the
choices. Description is a free format field.

.. figure:: ../_static/53EnterFileAttributes.PNG

Finally, click the + Add attribute button. Here the user may add
one or more file attributes. Enter both a key name and the
attribute value.

When finished, click the Add file button to save.

.. figure:: ../_static/54EnterUserFileAttribute.PNG

A finished file entry will look like this. It can be expanded
to show all the fields. Several files may be added.

.. figure:: ../_static/55ExampleFile.PNG

**Validate Step**

Please refer to the Validate Step in the Create Rare Disease
Phenopacket section.

After validating the phenopacket, the user will be taken to
the Phenopackets List screen and all the phenopackets created
by the user will be listed.
