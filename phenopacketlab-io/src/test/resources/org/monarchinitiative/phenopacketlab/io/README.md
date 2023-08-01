# README

The folder contains toy versions of real resources for testing.

- `mondo.module.json` - MONDO module containing ancestors of `MONDO:0007038` *Achoo syndrome*.
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/mondo.owl --term http://purl.obolibrary.org/obo/MONDO_0007038 --output mondo.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json mondo.module.owl
  rm mondo.module.owl
  ```
  > Note: `robot` does not preserve the `graphs | meta | version` field. Therefore, the line `"version" : "http://purl.obolibrary.org/obo/mondo/releases/2022-05-02/mondo.owl"` was manually inserted into `mondo.module.json`.

- `hp.module.json` - HPO module containing all ancestors of `HP:0001166` *Arachnodactyly* and complete sub-hierarchies  
  except from `HP:0000118` *Phenotypic abnormality*:
  ```shell
  wget https://github.com/obophenotype/human-phenotype-ontology/releases/download/v2022-10-05/hp.obo
  robot extract --input hp.obo --method BOT --term HP:0001166  convert --output arachnodactyly.hp.obo
  robot extract --input hp.obo --method TOP --term HP:0012823  convert --output clinical-modifier.hp.obo
  robot extract --input hp.obo --method BOT --term HP:0012823  convert --output clinical-modifier-bot.hp.obo
  robot extract --input hp.obo --method TOP --term HP:0032443  convert --output past-medical-history.hp.obo
  robot extract --input hp.obo --method BOT --term HP:0032443  convert --output past-medical-history-bot.hp.obo
  robot extract --input hp.obo --method TOP --term HP:0000005  convert --output moi.hp.obo
  robot extract --input hp.obo --method BOT --term HP:0000005  convert --output moi-bot.hp.obo
  robot extract --input hp.obo --method TOP --term HP:0032223  convert --output blood-group.hp.obo
  robot extract --input hp.obo --method BOT --term HP:0032223  convert --output blood-group-bot.hp.obo
  robot extract --input hp.obo --method TOP --term HP:0040279  convert --output frequency.hp.obo
  robot extract --input hp.obo --method BOT --term HP:0040279  convert --output frequency-bot.hp.obo
  
  # Merge into one file
  robot merge --input arachnodactyly.hp.obo \
  --input clinical-modifier.hp.obo \
  --input clinical-modifier-bot.hp.obo \
  --input past-medical-history.hp.obo \
  --input past-medical-history-bot.hp.obo \
  --input moi.hp.obo \
  --input moi-bot.hp.obo \
  --input blood-group.hp.obo \
  --input blood-group-bot.hp.obo \
  --input frequency.hp.obo \
  --input frequency-bot.hp.obo \
  --output hp.module.json
  
  rm *.obo
  ```

- `geno.full.json` - the complete GENO ontology prepared by running:
  ```shell
  wget http://purl.obolibrary.org/obo/geno.owl
  obographs convert -f json geno.owl
  rm geno.owl
  ```

- `uberon.module.json` - UBERON module containing ancestors of `UBERON:0000468` *multicellular organism* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/uberon.owl --term http://purl.obolibrary.org/obo/UBERON_0000468 --output uberon.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json uberon.module.owl
  rm uberon.module.owl
  ```

- `uo.json` - the complete UO prepared by running:
  ```shell
  wget http://purl.obolibrary.org/obo/uo.owl
  obographs convert -f json uo.owl
  rm uo.owl 
  ```

- `efo.json` - EFO module containing ancestors of `http://www.ebi.ac.uk/efo/EFO_0009370` *genomic DNA* prepared by running:
  ```shell
  robot extract --input-iri http://www.ebi.ac.uk/efo/efo.owl --term http://www.ebi.ac.uk/efo/EFO_0008479 --output efo.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json efo.module.owl
  rm efo.module.owl
  ```
  
- `so.json` - SO module containing descendents of `http://purl.obolibrary.org/obo/SO_0001537` *silent_mutation* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/so.owl --term http://purl.obolibrary.org/obo/SO_0001017 --output so.module.owl --method BOT --copy-ontology-annotations true
  obographs convert -f json so.module.owl
  ```

- `ncit.module.json` - NCIT module containing ancestors of `http://purl.obolibrary.org/obo/NCIT_C156482` *Genitourinary System Neoplasm* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/ncit.owl --term http://purl.obolibrary.org/obo/NCIT_C156482 --output ncit.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json ncit.module.owl
  rm ncit.module.owl
  ```

- `gsso.json` - GSSO module containing descendents of `http://purl.obolibrary.org/obo/GSSO_009468` *gender_modality* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/gsso.owl --term http://purl.obolibrary.org/obo/GSSO_009468 --output gsso.module.owl --method TOP --copy-ontology-annotations true
  obographs convert -f json gsso.module.owl
  rm gsso.module.owl
  ```

> Note: `robot` and `obographs` expand to `java -jar robot.jar` (`v1.8.3`) and `java -jar obographs-cli.jar` (`v0.3.0`).
 